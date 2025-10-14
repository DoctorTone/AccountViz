const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight intensity={20} position={[0, 6, 8]} />
    </>
  );
};

export default Lights;
