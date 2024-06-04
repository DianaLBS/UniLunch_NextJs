"use client";

import React from "react";
import { useRouter } from "next/router";
import UpdateProductForm from "../../../../components/UpdateProductForm";
import { useAuth } from "../../../../context/SessionAuthProvider";

const UpdateProductPage = () => {
  const { state: authState } = useAuth();
  const router = useRouter();
  const { productId } = router.query;

if (!authState.token) {
    return <p>You need to be logged in to update a product.</p>;
}

if (!authState.role || authState.role !== "restaurant") {
    return <p>You should be a restaurant</p>;
}


if (!productId) {
    return <p>Loading...</p>;
}

return (
    <div>
        <h1>Update Product</h1>
        <UpdateProductForm productId={String(productId)} />
    </div>
);
};

export default UpdateProductPage;
