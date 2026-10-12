import Image from "next/image";

const customerLogos = [
  ["akzo", "AkzoNobel"], ["plakor", "PLAKOR"], ["nonghyup", "농협"],
  ["logiport", "LOGIPORT"], ["sungmin", "성민글로벌"], ["aju", "아주약품"],
  ["baekkwang", "백광산업"], ["hwaseong", "화성"], ["db", "DB Schenker"],
];

export default function MobileCustomers() {
  return (
      <section className="mx-auto max-w-[600px] px-5 py-8 text-center">
        <p className="text-xs tracking-[4px] text-[#00ADDB]">CUSTOMER</p><h2 className="mt-4 text-[25px] font-bold">산정이 작업한 주요 현장</h2>
        <div className="mt-7 grid grid-cols-2 items-center gap-6">
          {customerLogos.map(([file, name]) => <div key={file} className="relative h-14"><Image src={`/images/home-refresh/customer-${file}.png`} alt={name} fill sizes="180px" className="object-contain" /></div>)}
          <p className="text-2xl font-extrabold text-red-600">오리온</p>
          <p className="text-3xl font-bold text-[#C82F17]">bb.q</p>
        </div>
      </section>
  );
}
