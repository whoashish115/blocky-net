import NextCors from "nextjs-cors";

export default async (req, res) => {
  try {
    await NextCors(req, res, {
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      origin: "*",
      optionsSuccessStatus: 200,
    });

    const { coins } = await fetch(process.env.COINMARKETCAP_CUSTOM_API).then((res) => res.json());
    return res.json({ data: coins ? coins : [] });
    
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
