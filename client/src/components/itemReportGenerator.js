import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

import img from "./img/Epid_Header.png"
import footerImg from "./img/Epid_Footer.png"

// define a generatePDF function that accepts a tickets argument
const generatePDF = items => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Procured Date", "Prod. Yr", "Category", "Model", "Location", "Status"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  items.forEach(item => {
    const itemData = [
      item.itemId,
      item.dateProcured.substring(0, 10),
      item.productionYear,
      item.equipment,
      item.model,
      item.location,
      item.currentFunctionalStatus
      // called date-fns to format the date on the ticket
      // format(new Date(), "yyyy-MM-dd")
    ];
    // push each item's info into a row
    tableRows.push(itemData);
  });

  function addFooters() {
    doc.setFontSize(10);
    const pageCount = doc.internal.getNumberOfPages();
    for(var i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.addImage(footerImg, 'PNG', 60, 285, 75, 6);
        doc.text(String(i), 196, 285);
    }
  };

  doc.addImage(img, 'PNG', 5, 5, 200, 25);

  // ticket title. and margin-top + margin-left
  doc.setFontSize(16);
  doc.text("Equipment Items", 80, 45);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, {startY: 52});

  // const date = Date().split(" ");
  // we use a date string to generate our filename.
  // const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  const dateStr = new Date().toISOString().substring(0,10);

  addFooters(); 

  // we define the name of our PDF file.
  doc.save(`ItemReport_${dateStr}.pdf`);
};

export default generatePDF;