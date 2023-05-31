import React, { useState } from "react";
import useGetUserAddress from "../../../../hooks/useGetUserAddress";
import { deleteUserAddress } from "../../../../api/address";
import UIAddressPage from "../UIAddressPage";
const AddressPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { isLoading, address, refetch } = useGetUserAddress();

  const deleteAddress = async () => {
    await deleteUserAddress();
    refetch();
  };
  return (
    <UIAddressPage
      isLoading={isLoading}
      address={address}
      setShowModal={setShowModal}
      deleteAddress={deleteAddress}
      showModal={showModal}
      refetch={refetch}
    />
  );
};

export default AddressPage;
