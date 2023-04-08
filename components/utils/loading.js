export const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
      }}
    >
      <Spinner textContent={"Loading..."} textStyle={{ color: "#000" }} />
    </View>
  );
};
