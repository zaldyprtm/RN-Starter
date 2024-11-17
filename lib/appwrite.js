import {
    Account,
    Client,
    Databases,
    ID,
  } from "react-native-appwrite";

  
  export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.muzalpra.muzzapp",
    projectId: "66b2d2890030c385a3e2",
    userCollectionId: "66b2e297003096fcc02c",
    databaseId: "66b2d4a600190034fd47",
    storageId: "66b2e2c5003877549f75"
  };
  
  const client = new Client();
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);
  
  const account = new Account(client);
  const databases = new Databases(client);
  
  // Fungsi untuk membuat user baru
  export async function createUser(email, password, username) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
      );
      if (!newAccount) throw new Error('Failed to create account');
      
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username
        }
      );
  
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Fungsi untuk login user
  // Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}


// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// get currentUser

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}