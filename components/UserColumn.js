import Image from 'next/image'
export default function UserColumn(userInfo) {
  return (
    <tr className='border-dotted border-b-2 border-light-blue-100'>
      <td>{userInfo.score}</td>
      <td className="text-left sm:w-44"><a href={userInfo.githubURL}><b className='text-gray-800 hover:text-gray-600'>{userInfo.githubUsername.length > 18 ? `${userInfo.githubUsername.substring(0,18)}..` : userInfo.githubUsername}</b>
      <p className="text-gray-400 ml-2 text-xs font-bold">({(userInfo.githubName.length > 25 ? `${userInfo.githubName.substring(0,20)}..` : userInfo.githubName) || "Doesn't have a name ☹"})</p>
      </a></td>
      <td>{userInfo.contribs}</td>
      <td>
        <a href={userInfo.githubURL}><Image src={userInfo.avatarURL} alt={`Avatar for ${userInfo.githubUsername}(${userInfo.githubName})`} height={40} width={40}  quality={100} ></Image></a>
      </td>
    </tr>
  )
}

