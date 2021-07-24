import React, { Component } from "react";

export default class TestReport extends Component{

    render() {
        return (
            <iframe width="1240" height="600" 
                    // width="1140" height="541.25" 
                    src="https://app.powerbi.com/reportEmbed?reportId=fc737c4a-29ee-4667-a9dc-79bec20f8580&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true" title="TestReport">

            </iframe>
        );
    }

}