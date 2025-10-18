import styled from "styled-components";

import Header from "./Header";
import SideBar from "./SideBar";
import Contents from "./Contents";

export default function MainLayout() {
    return (
        <div className="w-screen h-screen max-h-screen overflow-hidden">
            <SHeader>
                <Header></Header>
            </SHeader>
            <SBody>
                <SSideBar>
                    <SideBar></SideBar>
                </SSideBar>
                <SContents>
                    <Contents></Contents>
                </SContents>
            </SBody>
        </div>
    )
}

const SHeader = styled.div`
`

const SBody = styled.div`
	width: 100%;
	height: calc(100vh - 32px);
	display: flex;
	flex-direction: row
`

const SSideBar = styled.div`
	width: 30%;
`

const SContents = styled.div`
	width: 100%;
	height: 100%;
`

