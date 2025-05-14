import { buttonVariants } from "./ui/button";

export default function StatusBadje({ status = "draft" }) {
  const styles = {
    draft: {
      dot: "bg-[rgba(55,59,83,1)]",
      text: "text-[rgb(55,59,83,1)]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dot: "bg-[#33D69F]",
      text: "text-[#33D69F]",
      bg: "rgba(51,214,159,0.05)",
    },
    pending: {
      dot: "bg-[#FF8F00]",
      text: "text-[#FF8F00]",
      bg: "rgba(255,143,0,0.05)",
    },
  };

  const current = styles[status] || styles["draft"];

  return (
    <span
      className={`${buttonVariants({ variant: "outline" })} min-w-[104px] border-none`}
      style={{ backgroundColor: current.bg }}
    >
      <span className={`inline-block w-2 h-2 rounded-full ${current.dot}`} />
      <span className={`capitalize ${current.text}`}>{status}</span>
    </span>
  );
}
