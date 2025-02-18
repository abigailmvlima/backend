import House from "../models/House.js";
import Reserve from "../models/Reserve.js";
import User from "../models/User.js";

class ReserveController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);
    if (!house) {
      return res.status(400).json({ error: "Casa não existe" });
    }
    if (house.status !== true) {
      return res.status(400).json({ error: "Solicitação indisponivel" });
    }

    const user = await User.findById(user_id);
    if (user._id === house.user) {
      return res.status(401).json({ error: "Reserva não permitida" });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date: date,
    });

    await reserve.populate(["house", "user"]);

    return res.json(reserve);
  }
}

export default new ReserveController();
