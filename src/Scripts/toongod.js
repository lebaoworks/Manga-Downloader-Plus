function toongodF() {
    let templateFuncs = {};

    templateFuncs.isChapterListPage = function() {
        return true;
    };

    templateFuncs.getChapterElems = function() {
        return document.querySelectorAll("li.wp-manga-chapter");
    };

    templateFuncs.insertNote = function(note) {
        let chapterDiv = document.querySelector("div.listing-chapters_wrap");
        chapterDiv.insertBefore(note,chapterDiv.firstChild);
    };

    templateFuncs.processChapterElem = function(elem, pdfButton, zipButton) {
        let link = elem.querySelector("a").href;
        let title = elem.querySelector("a").textContent.trim();

        elem.insertBefore(zipButton,elem.firstChild);
        elem.insertBefore(pdfButton,elem.firstChild);

        return [link, title];
    };

    templateFuncs.getChapterImageUrls = function(chapterUrl, buttonGroup, reportProgress) {
        return fetchText(chapterUrl, window.location.href).then((text) => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(text, "text/html");
            let imgs = doc.querySelectorAll("div.reading-content img");
            let chapImgs = [];
            for (let img of imgs) {
                let src = img.dataset && (img.dataset.src || img.dataset.lazySrc) ? (img.dataset.src || img.dataset.lazySrc) : img.src;
                if (src) chapImgs.push(src.trim());
            }

            return chapImgs;
        });
    };

    templateF(templateFuncs);
}
