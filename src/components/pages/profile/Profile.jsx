function Profile({userId}) {
  const [user, setUser] = useState(null);

  async function getUser() {
    const res = await fetch(`http://localhost:3001/api/users/${userId}`);
    console.log(userId);
    console.log(res);
    const data = await res.json();
    console.log(data);
    setUser(
      // data.Cards.map((x) => {
      //   return {
      //     name: x.cardName,
      //     compass: [x.topAttack, x.rightAttack, x.bottomAttack, x.leftAttack],
      //     class: x.class,
      //     imagePath: x.imagePath,
      //   };
      // })
    );
  };

  return (
    <div>Profile</div>
  )
}

export default Profile