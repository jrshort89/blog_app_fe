import firebase from 'firebase/compat/app';

export const Settings = () => {

    const photoUrl = firebase.auth().currentUser?.photoURL!
    return <>
        <p>{firebase.auth().currentUser?.displayName}</p>
        <p>{firebase.auth().currentUser?.email}</p>
        <p>{firebase.auth().currentUser?.phoneNumber}</p>
        <img referrerPolicy='no-referrer' alt="profile photo" src={photoUrl} height={100} width={100}/>
    </>
}