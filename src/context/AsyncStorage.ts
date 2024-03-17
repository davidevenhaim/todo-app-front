import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DAYS = 2;
export const LOCA_DATA_EXPIRY = 1000 * 3600 * 24 * DAYS; // DAYS=2 so data will be save for 2 days.

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage, // for web: window.localStorage
  // can be null, which means never expire.
  defaultExpires: LOCA_DATA_EXPIRY,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

export default storage;
