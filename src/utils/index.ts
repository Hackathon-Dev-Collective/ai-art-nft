export const  getCidUrl= (cid:string)=>{
    return `https://gateway.pinata.cloud/ipfs/${cid}`
}

export const shortenAddress = (address: string): string=> {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}