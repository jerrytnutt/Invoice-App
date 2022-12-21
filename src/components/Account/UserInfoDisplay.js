import AccountPageInput from './AccountPageEditor';
function UserInfoDisplay(props) {
  console.log(props.editUserInfo);
  const updateUserInfo = props.updateUserInfo;
  return (
    <div>
      {props.editUserInfo ? (
        <AccountPageInput updateUserInfo={updateUserInfo} />
      ) : (
        <>
          <p>{props.user.companyName}</p>
          <p>{props.user.companyEmail}</p>
          <p>{props.user.companyAddress}</p>
        </>
      )}
    </div>
  );
}

export default UserInfoDisplay;
