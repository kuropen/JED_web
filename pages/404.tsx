import { NextPage } from "next";
import Layout from "../components/layout";
import React from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/alert";

const Custom404: NextPage = () => {
    return (
        <Layout>
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr="2">404 Not found</AlertTitle>
                <AlertDescription>指定されたページはありません。</AlertDescription>
            </Alert>
        </Layout>
    )
}

export default Custom404
