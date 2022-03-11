export default function handleErrorMessage(err, customMessage) {
  return err.response
    ? {
        status: err.response.status,
        message: err.response.data.msg,
      }
    : {
        status: null,
        message: customMessage,
      };
}
