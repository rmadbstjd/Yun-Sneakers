import Swal from "sweetalert2";
const Alert = ({ message, state, time }) => {
  Swal.fire({
    title: `${message}`,
    icon: `${state}`,
    timer: `${time}`,
  });
};

export default Alert;
