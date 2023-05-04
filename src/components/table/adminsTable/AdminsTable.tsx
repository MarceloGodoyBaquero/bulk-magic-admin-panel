import {Table, Card, Spacer, Text, Container, Loading} from "@nextui-org/react";
import useSWR from "swr"

export default function AdminsTable() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const {
    data,
    isLoading
  } = useSWR(`${process.env.NEXT_PUBLIC_URL_SERVER}/admin/list`, fetcher, {refreshInterval: 20000});

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
          aria-label="Example pagination table2"
          css={{
            height: "auto",
            minWidth: "100%",
          }}>
          <Table.Header>
            <Table.Column>Country Code</Table.Column>
            <Table.Column>Phone Number</Table.Column>
            <Table.Column>Email Address</Table.Column>
            <Table.Column>Name</Table.Column>
          </Table.Header>
          <Table.Body>
            {
              data?.map((admin: any) => {
                return (
                  <Table.Row key={admin._id}>
                    <Table.Cell>{admin.phone ? admin.phone.split("-")[0] : '-'}</Table.Cell>
                    <Table.Cell>{admin.phone ? admin.phone.split("-")[1] : '-'}</Table.Cell>
                    <Table.Cell>{admin.email ? admin.email : '-'}</Table.Cell>
                    <Table.Cell>{admin.username}</Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      </div>
      <div className={"mobile-view"}>
        {
          data?.map((admin: any) => {
              return (
              <>
                <Card key={admin._id}>
                  <Card.Header>
                    <Text h4>
                      ADMIN ID: {admin._id}
                    </Text>
                  </Card.Header>
                  <Card.Body>
                    <Text h5>
                      Store Name: {admin.username}
                    </Text>
                    <Text h5>
                      Country Code: {admin.phone ? admin.phone.split("-")[0] : "-"}
                    </Text>
                    <Text h5>
                      Phone Number: {admin.phone ? admin.phone.split("-")[1] : "-"}
                    </Text>
                    <Text h5>
                      Email Address: {admin.email ? admin.email : "-"}
                    </Text>
                  </Card.Body>
                </Card>
                <Spacer y={1}/>
              </>
              );
            })
        }
      </div>
    </>
  );
}
