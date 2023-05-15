import {Navbar, Dropdown, Avatar, Text, Button} from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import BulkMagicLogo from "./img.png";
import Image from "next/image";
import {useSessionStore} from "@/components/store/session";
import {useRouter} from "next/router";
import useSessionValidator from "@/components/hooks/useSessionValidator";

export default function NavBar({location}: { location: string }) {
  const {user, logOut} = useSessionStore();
  useSessionValidator();
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    router.push("/");
  }

  return (
    <>
      <Navbar disableBlur isBordered variant={"sticky"}>
        <Navbar.Toggle showIn="xs"/>
        <Navbar.Brand>
          <Image src={BulkMagicLogo} width={40} height={40} alt={"BulkMagic Logo"}/>
          <Text h2>BulkMagic</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link isActive={location === "admin"} href="/admin">Admin</Navbar.Link>
          <Navbar.Link isActive={location === "merchants"} href="/admin/merchants?page=1">Merchants</Navbar.Link>
          <Navbar.Link isActive={location === "buyers"} href="/admin/buyers?page=1">Buyers</Navbar.Link>
          <Navbar.Link isActive={location === "languages"} href="/admin/languages/English/en">Languages</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color={"primary"}
                  size="md"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="primary"
              onAction={(actionKey) => console.log({actionKey})}>
              <Dropdown.Item key="profile" css={{height: "$18"}}>
                <Text b color="inherit" css={{d: "flex"}}>
                  Signed in as {user?.name}
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                <Button css={{width: "100%"}} light color="error" onPress={() => handleLogOut()}>
                  Log Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          <Navbar.CollapseItem
            key={"admin"}
            isActive={location === "admin"}
            activeColor="primary">
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/admin">
              Admin
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem
            key={"merchants"}
            isActive={location === "merchants"}
            activeColor="primary">
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/admin/merchants?page=1">
              Merchants
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem
            key={"buyers"}
            isActive={location === "buyers"}
            activeColor="primary">
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/admin/buyers?page=1">
              Buyers
            </Link>
          </Navbar.CollapseItem>
          <Navbar.CollapseItem
            key={"languages"}
            isActive={location === "languages"}
            activeColor="primary">
            <Link
              color="inherit"
              css={{
                minWidth: "100%",
              }}
              href="/admin/languages/English/en">
              Languages
            </Link>
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
