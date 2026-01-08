import Image from "next/image";
import "./promoutions.scss";
import promoution_1 from "../../public/promoution_1.webp";
import promoution_2 from "../../public/promoution_2.webp";
export function Promoutions() {
  return (
    <>
      <div className="promoutions">
        <div className="promoutions-content">
          <h2>Наши акции</h2>
          <div className="promoution-card">
            <div className="promoution">
              <Image
                src={promoution_1}
                width={715}
                height={300}
                alt="Скидка 20% на первую уборку"
              />
              <p>
                <b>Бонус</b>
                <br />
                на первую уборку
              </p>
            </div>
            <div className="promoution">
              <Image
                src={promoution_2}
                width={715}
                height={300}
                alt="Скидка 10% дляновосёлов"
              />
              <p>
                <b>Скидка 10%</b>
                <br />
                для новосёлов
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
