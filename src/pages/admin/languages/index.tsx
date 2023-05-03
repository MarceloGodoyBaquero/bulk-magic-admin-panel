import Head from "next/head"
import NavBar from "@/components/navbar/Navbar"
import {Container, Text, Textarea, Button, Spacer} from "@nextui-org/react"
import en from "./en"
import {useEffect, useState} from "react";
import {useFormStore1, useFormStore2} from "@/components/store/form";


export default function Languages() {
  const {common, setCommon, commonRef} = useFormStore1()
  const {homeScreen, homeScreenRef, setHomeScreen} = useFormStore2()
  return (
    <>
      <Head>
        <title>BulkMagic Languages Dashboard</title>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBar location={"languages"}/>
      <Container sm aria-label={'test'} >
        <h1>Languages</h1>
        <Text h3 color={"primary"}>Common</Text>
        {
          Object?.entries(commonRef)?.map(([key, value]) => {
            return (
              <Container key={key}>
                <Text h4>{value}</Text>
                <Textarea
                  aria-label={key}
                  onChange={(e) => setCommon(key, e.target.value)}
                  placeholder={value}
                  width="100%"
                  height="100px"
                />
                <Spacer y={1}/>
              </Container>
            )
          })
        }
        <Text h3 color={"primary"}>Home Screen</Text>
        {
          Object?.entries(homeScreenRef)?.map(([key, value]) => {
            return (
              <Container key={key}>
                <Text h4>{value}</Text>
                <Textarea
                  aria-label={key}
                  onChange={(e) => setHomeScreen(key, e.target.value)}
                  placeholder={value}
                  width="100%"
                  height="100px"
                />
                <Spacer y={1}/>
              </Container>
            )
          })
        }
        <Text h3 color={"primary"}>Home Screen</Text>
        <Spacer y={1}/>
        <Button onPress={(e) => console.log(common)}>
          Save
        </Button>
      </Container>
    </>
  )
}
