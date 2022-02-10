import * as SecureStore from 'expo-secure-store';

export function save(key:string, value:string|object|boolean|number): Promise<void>{
  return new Promise((resolve, reject) => {
    let valueToStore:string;
  
    switch(typeof(value)) {
      case 'string':
        valueToStore = value
        break;
      case 'object':
      case 'boolean':
      case 'number':
        valueToStore = JSON.stringify(value)
        break;
    }
    
    if(valueToStore == undefined){
      reject("Invalid value type passed; unable to save to secure store")
    }
    
    SecureStore.setItemAsync(key, valueToStore).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getValueFor(key:string): Promise<string|object|boolean|number> {
  return new Promise((resolve, reject) => {
    SecureStore.getItemAsync(key).then(value => {
      if(value == null){
        reject(`Key '${key}' is not associated with any value`)
      } else {
        try {
          //value is number, object or boolean
          let parsedValue = JSON.parse(value);
          resolve(parsedValue);
        }
        catch {
          //value is a string
          resolve(value)
        }
      }
    })
  })
  }

export async function deleteValueFor(key:string): Promise<void> {
    return await SecureStore.deleteItemAsync(key);
  }