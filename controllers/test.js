export async function handleRequest(req, res) {
  try {
    if (req.method === "GET") return res.status(200).json("Here is your data");
    else {
      console.log(req.body);
      return res.status(200);
    }
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
}
