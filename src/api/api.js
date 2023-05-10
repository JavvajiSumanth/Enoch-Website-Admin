import {
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import uniqid from "uniqid";
import { deleteObject, ref } from "firebase/storage";

export const deleteCourse = async (courseID) => {
  try {
    await deleteDoc(doc(db, "properties", courseID));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const appendImage = async (URL, genratedID) => {
  const imageRef = doc(db, "images", genratedID);
  await setDoc(imageRef, {
    url: URL,
    id: genratedID,
    selected: false,
  });
};
export const blockUser = async (uid, status, propertyId, role) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    block: status,
  });
  const propertyRef = doc(db, "properties", propertyId);
  await updateDoc(
    propertyRef,
    role === "OWNER"
      ? {
          isOwnerBlocked: status,
        }
      : {
          isTenantBlocked: status,
        }
  );
};

export const updatePropertyWithTenant = async (propertyId, TENANT) => {
  const propertyRef = doc(db, "properties", propertyId);
  await updateDoc(propertyRef, {
    TENANT: TENANT,
    hideProperty: true,
  });
};
