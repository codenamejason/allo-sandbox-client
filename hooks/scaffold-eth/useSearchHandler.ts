import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";

export const useSearchHandler = () => {
  const [searchInput, setSearchInput] = useState("");
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const router = useRouter();

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (ethers.utils.isHexString(searchInput)) {
      try {
        const tx = await provider.getTransaction(searchInput);
        if (tx) {
          router.push(`/transaction/${searchInput}`);
          return;
        }
      } catch (error) {
        console.error("Failed to fetch transaction:", error);
      }
    }

    if (ethers.utils.isAddress(searchInput)) {
      router.push(`/address/${searchInput}`);
      return;
    }
  };

  return {
    handleSearch,
    searchInput,
    setSearchInput,
  };
};