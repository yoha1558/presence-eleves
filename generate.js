const fs = require("fs-extra");
const AdmZip = require("adm-zip");

async function build() {

    await fs.ensureDir("./build");

    const zip = new AdmZip();

    zip.addLocalFolder("./source");

    zip.writeZip("./build/presences.zip");

    console.log("ZIP créé avec succès");
}

build().catch(console.error);