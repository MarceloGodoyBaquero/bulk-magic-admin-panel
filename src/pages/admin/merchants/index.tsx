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
  Card,
  Badge,
  Modal
} from "@nextui-org/react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {useState, useEffect} from "react";
import {toast} from "react-hot-toast";
import {deleteUser} from "@/utils/accessServices";

interface data {
  userId: string;
  active: boolean;
  deletion: boolean;
  _id: number;
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

function DataTable({data, isLoading}: { data: any, isLoading: any }) {

  const [visible, setVisible] = useState(false);

  const [user, setUser] = useState<any>({
    userId: 0,
    name: "",
    status: false,
  });

  const [nameConfirmation, setNameConfirmation] = useState("");

  const closeHandler = () => {
    setVisible(false);
  };

  const handler = (id: string | number, name: string, status : boolean) => {
    setUser({
      userId: id,
      name: name,
      status: status,
    });
    setVisible(true);
  };

  const handleFormSubmit = () => {
    if (nameConfirmation === user.name) {
      deleteUser(user.userId)
        .then((res) => {
          console.log(res)
          toast.success("User deleted successfully");
          setVisible(false);
        })
        .catch((e) => {
          console.log(e)
          toast.error(e.response.data.message);
          setVisible(false);
        });
    } else {
      toast.error("Name confirmation is not correct");
    }
  };

  const handleFormChange = (e: any) => {
    setNameConfirmation(e.target.value);
  };


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
            <Table.Column align="center">Status</Table.Column>
            <Table.Column align="center">Transaction Totals</Table.Column>
          </Table.Header>
          <Table.Body>
            {
              data?.agregation?.map((item: data) => (
                <Table.Row key={item._id}>
                  <Table.Cell>{item?.storeId[0]?.idNumber}</Table.Cell>
                  <Table.Cell>{item.phone ? item.phone.split("-")[0] : "-"}</Table.Cell>
                  <Table.Cell>{item.phone ? item.phone.split("-")[1] : "-"}</Table.Cell>
                  <Table.Cell>{item.email ? item.email : "-"}</Table.Cell>
                  <Table.Cell>{item.username}</Table.Cell>
                  <Table.Cell>
                    <Badge css={{cursor: "pointer"}} onClick={() => handler(item._id, item.username, item.active)}
                           color={item.deletion ? "error" : item.active ? "primary" : "warning"}>
                      {item.deletion ? "del" : item.active ? "act" : "ina"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>${item.total}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
      <div className={"mobile-view"}>
        {
          data?.agregation?.map((item: data) => (
            <>
              <Card key={item._id}>
                <Card.Header>
                  <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                    <Text h4>
                      Store ID: {item?.storeId[0]?.idNumber}
                    </Text>
                    <div>
                      <Badge color={item.active ? "primary" : "warning"}>
                        {item.active ? "Active account" : "Inactive account"}
                      </Badge>
                      {item.deletion ? <Badge color={"error"}>
                        Marked for deletion
                      </Badge> : null}
                    </div>
                  </div>
                </Card.Header>
                <Card.Divider/>
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
                <Card.Divider/>
                <Card.Footer>
                  <Button onPress={() => handler(item._id, item.username, item.active)} color={item.active ? "error" : "success"}>
                    {item.active ? "Deactivate" : "Activate"}
                  </Button>
                </Card.Footer>
              </Card>
              <Spacer y={1}/>
            </>
          ))
        }
      </div>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}>
        <Modal.Header>
          <Text h3>You want to {user.status ? 'deactivate' : 'activate'} {user.name} ?</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>If you are sure, type {user.name} and press {user.status ? 'deactivate' : 'activate'}</Text>
          <Input
            bordered
            name={"username"}
            onChange={(e) => handleFormChange(e)}
            fullWidth
            clearable
            label={"Name"}/>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleFormSubmit}>
            {user.status ? 'Deactivate' : 'Activate'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function Merchants() {
  const router = useRouter();
  const page = router.query.page || 1;
  const term = router.query.searchTerm || "";
  const sortTerm = router.query.sort || "";

  const [searchTerm, setSearchTerm] = useState<any>("");
  const [sort, setSort] = useState<any>("");

  useEffect(() => {
    setSort(sortTerm);
    setSearchTerm(term);
  }, [sortTerm, term]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data,
    isLoading
  } = useSWR(`${process.env.NEXT_PUBLIC_URL_SERVER}/admin/listMerchants?page=${page}&limit=10&searchTerm=${term}&sort=${sortTerm}`, fetcher, {refreshInterval: 20000});

  const handleSearchInput = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    router.push(`/admin/merchants?page=1&searchTerm=${searchTerm ? encodeURIComponent(searchTerm) : ""}&sort=${sort}`);
  };

  const handleSort = () => {
    if (sort.length === 0) {
      setSort("earned");
      router.push(`/admin/merchants?page=1&searchTerm=${searchTerm ? searchTerm : ""}&sort=earned`);
    } else {
      setSort("");
      router.push(`/admin/merchants?page=1&searchTerm=${searchTerm ? searchTerm : ""}&sort=`);
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
          <Input labelPlaceholder="Search" value={searchTerm} bordered color="primary"
                 onChange={(e) => handleSearchInput(e)}
                 name="searchTerm"/>
          <Spacer x={1}/>
          <Button auto onPress={() => handleSubmit()}>
            Search
          </Button>
        </Container>
        <Spacer y={1}/>
        <Container display="flex" direction="column" justify="center" alignItems="flex-end">
          <Button auto bordered={!sort.length} color={sort.length ? "success" : "primary"}
                  onPress={() => handleSort()}>
            Order by: Largest Transactions
          </Button>
        </Container>
        <Spacer y={1}/>
        <DataTable data={data} isLoading={isLoading}/>
        <Spacer y={1}/>
        {!isLoading ? <><Container display="flex" justify="center" alignItems="center">
          <Pagination
            total={data?.totalPages}
            page={Number(page)}
            initialPage={1}
            onChange={(page) => router.push(`/admin/merchants?page=${page}&searchTerm=${term}&sort=${sortTerm}`)}
          />
        </Container>
          <Spacer y={1}/>
          <Container sm display="flex" alignItems="flex-end" justify="flex-end">
            <Text h3>
              Total Sum of Transactions: ${data?.totalSum}
            </Text>
          </Container></> : null}
      </Container>
    </>
  );
}
