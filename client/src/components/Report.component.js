import React, { Component } from "react";


export default class Report extends Component {
    // constructor(props) {
    //     super(props);

    //     // Set up the configuration object that determines what to embed and how to embed it.
    //     let embedConfiguration = {
    //         accessToken: anAccessToken,
    //         embedUrl: anEmbedUrl,
    //         id: aReportId,
    //         permissions: somePermissions,
    //         tokenType: aTokenType,
    //         type: 'report'
    //     };

    //     // Get a reference to the HTML element that contains the embedded report.
    //     let embedContainer = $('#embedContainer')[0];

    //     // Embed the report.
    //     let report = powerbi.embed(embedContainer, embedConfiguration);
    // }



    // reportDownload(e){
    //     report.saveAs();
    // }

    render() {
        return (
            <iframe width="1240" height="600"
                // width="1140" height="541.25" 
                // src="https://app.powerbi.com/reportEmbed?reportId=fc737c4a-29ee-4667-a9dc-79bec20f8580&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" 
                src="https://app.powerbi.com/reportEmbed?reportId=39ecb381-a8c9-4497-acec-645097326d09&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
                frameborder="0" allowFullScreen="true" title="TestReport">
            </iframe>
        );
    }

}