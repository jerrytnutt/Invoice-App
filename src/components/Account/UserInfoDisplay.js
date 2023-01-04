import AccountPageInput from './AccountPageEditor';
import Button from 'react-bootstrap/Button';
function UserInfoDisplay(props) {
  return (
    <div>
      {props.editUserInfo ? (
        <AccountPageInput
          updateUserInfo={props.updateUserInfo}
          seteditUserInfo={props.seteditUserInfo}
        />
      ) : (
        <div>
          <p>{props.user.companyName}</p>
          <p>{props.user.companyAddress}</p>
          <Button
            onClick={() => {
              props.seteditUserInfo(true);
            }}
            variant="success"
            type="submit"
          >
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserInfoDisplay;
