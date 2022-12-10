import { create as ipfsHttpClient } from "ipfs-http-client";

class UploadIpfs {
  client = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_INFURA_IPFS_ID +
          ":" +
          process.env.NEXT_PUBLIC_INFURA_IPFS_SECRET
      ).toString("base64")}`,
    },
  });

  async uploadFile(file: File) {
    const uploadedFile = await this.client.add(file);
    return `${process.env.NEXT_PUBLIC_INFURA_IPFS_GATEWAY}/${uploadedFile.path}`;
  }

  async uploadJson(data: any) {
    const uploadedData = await this.client.add(JSON.stringify(data));
    return `${process.env.NEXT_PUBLIC_INFURA_IPFS_GATEWAY}/${uploadedData.path}`;
  }
}

export default UploadIpfs;
