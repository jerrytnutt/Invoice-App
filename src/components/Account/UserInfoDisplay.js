import AccountPageInput from './AccountPageEditor';

function UserInfoDisplay(props) {
  return (
    <div>
      {props.editUserInfo ? (
        <AccountPageInput updateUserInfo={props.updateUserInfo} />
      ) : (
        <>
          <p>{props.user.companyName}</p>
          <p>{props.user.companyAddress}</p>
        </>
      )}
    </div>
  );
}

export default UserInfoDisplay;
