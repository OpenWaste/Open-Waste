import AsyncStorage from '@react-native-async-storage/async-storage';

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
    
    AsyncStorage.setItem(key, valueToStore).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

export function getValueFor(key:string): Promise<string|object|boolean|number> {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key).then(value => {
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
    return await AsyncStorage.removeItem(key);
  }