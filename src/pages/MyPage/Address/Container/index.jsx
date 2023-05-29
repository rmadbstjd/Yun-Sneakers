import React, { useState } from "react";
import useGetUserAddress from "../../../../hooks/useGetUserAddress";
import { deleteUserAddress } from "../../../../api/myPage";
import UIAddressPage from "../UIAddressPage";
const AddressPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { address, refetch } = useGetUserAddress();

  const deleteAddress = async () => {
    await deleteUserAddress();
    refetch();
  };
  return (
    <UIAddressPage
      address={address}
      setShowModal={setShowModal}
      deleteAddress={deleteAddress}
      showModal={showModal}
      refetch={refetch}
    />
  );
};

export default AddressPage;
