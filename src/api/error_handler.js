// import { MessageBox } from 'mint-ui'

// export function errorHandler (error) {
//   if('message' in error){
//     window.mAlert(error.message)
//   } else if('request' in error){
//     window.mAlert(error.request)
//   } else if('data' in error){
//     var description = ''
//     if(error.data.description){
//       description = error.data.description
//     } else if(error.statusText) {
//       description = error.statusText
//     }
//     window.mAlert(description)
//   }
// }

// export function transformAxiosErrorObject(error) {
//   var err = {}
//   if(error.response){
//     err['data'] = error.response.data
//     err['status'] = error.response.status
//     err['statusText'] = error.response.statusText
//   } else if(error.request){
//     err['request'] = error.request
//   } else {
//     err['message'] = error.message
//   }
//   return err
// }

// export function catchError(error, errorCallback){
//   if(errorCallback){
//     errorCallback(transformAxiosErrorObject(error))
//   } else {
//     errorHandler(transformAxiosErrorObject(error))
//   }
// }
