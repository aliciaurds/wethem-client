import Logo from "../assets/images/wethem.png"

function About() {
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <hr />
      <br />
      <img src={Logo} alt="logo" width={300} />
      <div style={{textAlign: "justify", margin: "0 20px"}}>
        <p>The Fibonacci spiral is a sequence of numbers where each number is the
        sum of the two preceding numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, and so
        on. If you take squares with side lengths corresponding to consecutive
        Fibonacci numbers and place them adjacent to each other, they form a
        spiral. Many consider it a symbol of growth, harmony, balance, and
        mathematical beauty in the world around us. </p>
        <p>Thus, our store is more than just a space for fashion; it's a reflection of the very essence of
        nature. Similar to the Fibonacci spiral, which is found in the most
        beautiful and diverse patterns of our environment, such as in plant
        leaves, snail shells, or even galaxies, we seek to break away from
        predefined standards and find beauty in diversity.</p>
        <p>
        This proportion transcends labels and stereotypes. Just as nature isn't confined by
        conventions, our clothing collection isn't limited by gender barriers. That's why
        you won't find women and men collection. We believe in the freedom of expression through fashion, 
        where each individual finds their own harmony in dressing. Because clothes should not have gender. 
        </p>
        <p>Here, you won't find anything but clothes. Simply as that.</p>
         <p>Just clothes.</p> 
         <p>WeThem Project®</p>
      </div>
    </div>
  );
}

export default About;
