import Image from "next/image";
export default function UserColumn(userInfo) {
  return (
    <tr className="border-dotted border-t-2 border-light-blue-100 x">
      <td className="w-1/12">{userInfo.score}</td>
      <td className="text-left w-60 w-2/4">
        <a href={userInfo.githubURL}>
          <b
            className="text-gray-800 dark:text-gray-200  hover:text-gray-600  "
          >
            {userInfo.githubUsername.length > 16
              ? `${userInfo.githubUsername.substring(0, 16)}..`
              : userInfo.githubUsername}
          </b>
          <p className="text-gray-400 ml-2 text-xs font-bold	">
            ({(userInfo.githubName?.length > 25
              ? `${userInfo.githubName.substring(0, 20)}..`
              : userInfo.githubName) || "Doesn't have a name ☹"})
          </p>
        </a>
      </td>
      <td className="w-1/5">{userInfo.contribs}</td>
      <td className="w-1/5">
        <a href={userInfo.githubURL}>
          <img
            className="m-auto"
            src={userInfo.avatarURL}
            alt={`Avatar for ${userInfo.githubUsername}(${userInfo.githubName})`}
            height={40}
            width={40}
          />
        </a>
      </td>
    </tr>
  );
}
