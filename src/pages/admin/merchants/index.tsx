import Head from "next/head";
import NavBar from "@/components/navbar/Navbar";
import {
  Container,
  Table,
  Text,
  Spacer,
  Input,
  Button,
  Pagination,
  Loading,
  Card
} from "@nextui-org/react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {useState} from "react";

interface data {
  userId: number;
  id: number;
  email: string;
  username: string;
  phone: string;
  total: number;
  storeId: [
    {
      idNumber: string;
    }
  ];
}

function DataTable({page, data, isLoading}: { page: any, data: any, isLoading: any }) {
  const router = useRouter();
  console.log(data)
 if (isLoading) {
    return (
      <Container xl display="flex" alignItems="center" justify="center">
        <Spacer y={10}/>
        <Loading size="xl" type="points">
          Loading Table
        </Loading>
      </Container>
    );
  }
  return (
    <>
      <div className={"desktop-view"}>
        <Table
          lined
          color="primary"
          animated
          aria-label="Example pagination table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column align="center">Store ID</Table.Column>
            <Table.Column align="center">Country Code</Table.Column>
            <Table.Column align="center">Phone Number</Table.Column>
            <Table.Column align="center">Email Address</Table.Column>
            <Table.Column align="center">Store Name</Table.Column>
            <Table.Column align="center">Transaction Totals (Local Currency)</Table.Column>
          </Table.Header>
          <Table.Body>
            {
              data?.agregation?.map((item: data) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item?.storeId[0]?.idNumber}</Table.Cell>
                  <Table.Cell>{item.phone ? item.phone.split("-")[0] : "-"}</Table.Cell>
                  <Table.Cell>{item.phone ? item.phone.split("-")[1] : "-"}</Table.Cell>
                  <Table.Cell>{item.email ? item.email : "-"}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>${item.total}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <Spacer y={1}/>
        <Container display="flex" justify="center" alignItems="center">
          <Pagination
            total={data.totalPages}
            page={Number(page)}
            initialPage={1}
            onChange={(page) => router.push(`/admin/merchants?page=${page}`)}
          />
        </Container>
        <Spacer y={1}/>
        <Container sm display="flex" alignItems="flex-end" justify="flex-end">
          <Text h3>
            Total Sum of Transactions: ${data.totalSum}
          </Text>
        </Container>
      </div>
      <div className={"mobile-view"}>
        {
          data?.agregation?.map((item: data) => (
            <>
              {/*@ts-ignore*/}
              <Card key={item._id}>
                <Card.Header>
                  <Text h4>
                    Store ID: {item?.storeId[0]?.idNumber}
                  </Text>
                </Card.Header>
                <Card.Body>
                  <Text h5>
                    Country Code: {item.phone ? item.phone.split("-")[0] : "-"}
                  </Text>
                  <Text h5>
                    Phone Number: {item.phone ? item.phone.split("-")[1] : "-"}
                  </Text>
                  <Text h5>
                    Email Address: {item.email ? item.email : "-"}
                  </Text>
                  <Text h5>
                    Store Name: {item.username}
                  </Text>
                  <Text h5>
                    Transaction Totals (Local Currency): ${item.total}
                  </Text>
                </Card.Body>
              </Card>
              <Spacer y={1}/>
            </>
          ))
        }
        <Spacer y={1}/>
        <Container display="flex" justify="center" alignItems="center">
          <Pagination
            total={data.totalPages}
            page={Number(page)}
            initialPage={1}
            onChange={(page) => router.push(`/admin/merchants?page=${page}`)}
          />
        </Container>
        <Spacer y={1}/>
        <Container sm display="flex" alignItems="flex-end" justify="flex-end">
          <Text h3>
            Total Sum of Transactions: ${data.totalSum}
          </Text>
        </Container>
      </div>
    </>
  );
}

export default function Merchants() {
  const router = useRouter();
  const page = router.query.page || 1;
  const [searchTerm, setSearchTerm] = useState('');
  const [sort1, setSort1] = useState({
    term: "",
    active: false,
  });

  const [sort2, setSort2] = useState({
    term: "",
    active: false,
  });

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data,
    isLoading
  } = useSWR(`http://localhost:3000/api/admin/listMerchants?page=${page}&limit=10&searchTerm=${searchTerm}&sort=${sort1.active ? sort1.term : sort2.active ? sort2.term : ""}`, fetcher, {refreshInterval: 20000});

  const handleSearchInput = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {

    router.push(`/admin/merchants?page=1&searchTerm=${searchTerm ? searchTerm : ''}&sort=${sort1.active ? sort1.term : sort2.active ? sort2.term : ''}`);
  };

  const handleSort1 = (e: any) => {
    if (sort1.active) {
      setSort1({
        ...sort1,
        term: "",
        active: false,
      });
    } else {
      setSort1({
        ...sort1,
        term: "login",
        active: true,
      });
      setSort2({
        ...sort2,
        term: "",
        active: false,
      });
    }
  };

  const handleSort2 = (e: any) => {
    if (sort2.active) {
      setSort2({
        ...sort2,
        term: "",
        active: false,
      });
    } else {
      setSort2({
        ...sort2,
        term: "earned",
        active: true,
      });
      setSort1({
        ...sort1,
        term: "",
        active: false,
      });
    }
  };

  return (
    <>
      <Head>
        <title>BulkMagic Merchants Dashboard</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBar location={"merchants"}/>
      <Container sm>
        <Spacer y={1}/>
        <Text h1>Merchants Management</Text>
        <Spacer y={1}/>
        <Container display="flex" direction="row" justify="flex-start" alignItems="center">
          <Input labelPlaceholder="Search" bordered color="primary" onChange={(e) => handleSearchInput(e)} name="searchTerm"/>
          <Spacer x={1}/>
          <Button auto onPress={() => handleSubmit()}>
            Search
          </Button>
        </Container>
        <Spacer y={1}/>
        <Container display="flex" direction= "column" justify="center" alignItems="flex-end">
            <Button auto bordered={!sort1.active} color={sort1.active ? "success" : "primary"}
                    onPress={(e) => handleSort1(e)}>
              Recent Signups
            </Button>
          <Text h6>
            (default is chronological)
          </Text>
        </Container>
        <Container display="flex" direction= "column" justify="center" alignItems="flex-end">
            <Button auto bordered={!sort2.active} color={sort2.active ? "success" : "primary"}
                    onPress={(e) => handleSort2(e)}>
              Largest Transactions
            </Button>
          <Text h6>
            (try it to pair with &#34;Country Code&#34;)
          </Text>
        </Container>
        <Spacer y={1}/>
        <DataTable page={page} data={data} isLoading={isLoading}/>
      </Container>
    </>
  );
}
