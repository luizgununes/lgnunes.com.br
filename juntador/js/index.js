const { PDFDocument } = PDFLib;

window.arrayOfPdf = [];
var input = document.getElementById("pdf-file");

function openfile(evt) {
  var files = input.files;
  fileData = new Blob([files[0]]);
  var promise = new Promise(getBuffer(fileData));
  promise
    .then(function (data) {
      window.arrayOfPdf.push({
        bytes: data,
        name: files[0].name,
      });
      listFilesOnScreen();
    })
    .catch(function (err) {
      console.log("Error: ", err);
    });
}

function getBuffer(fileData) {
  return function (resolve) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileData);
    reader.onload = function () {
      var arrayBuffer = reader.result;
      var bytes = new Uint8Array(arrayBuffer);
      resolve(bytes);
    };
  };
}

function listFilesOnScreen() {
  $(".pdf-file").remove();
  if (window.arrayOfPdf.length > 0) {
    $(".no-files").hide();
    $.each(window.arrayOfPdf, function (i, v) {
      $(".list-files").append(` 
           <div id="pdf-${i}" class="pdf-file">
           <div onclick="removePdf(${i})" class="btn-remove">x</div>
           ${v.name}</div>`);
    });
  } else {
    $(".no-files").show();
  }
}

function removePdf(index) {
  window.arrayOfPdf.splice(index, 1);
  listFilesOnScreen();
}

async function joinPdf() {
  if (window.arrayOfPdf.length == 0) {
    alert("Nenhum arquivo selecionado!");
  } else if (window.arrayOfPdf.length == 1) {
    alert("Escolha outro arquivo!");
  } else {
    const mergedPdf = await PDFDocument.create();
    for (let document of window.arrayOfPdf) {
      document = await PDFDocument.load(document.bytes);
      const copiedPages = await mergedPdf.copyPages(
        document,
        document.getPageIndices()
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    var pdfBytes = await mergedPdf.save();
    download(
      pdfBytes,
      "pdfcombinado" + new Date().getTime() + ".pdf",
      "application/pdf"
    );
  }
}

input.addEventListener("change", openfile, false);
