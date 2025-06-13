// Products sorted by payment period
  let mnth_prods = [];
  let qrt_prods = [];

  // Products sorted by type
  const cai_packages = [["CAI Platform - Essential", "CAI Platform - Growth", "CAI Platform - Premium"], ["CAI Platform - Essential  (Quarterly)", "CAI Platform - Growth (Quarterly)", "CAI Platform - Premium (Quarterly)"]];
  const bookkeeping = [["CAI: Bookkeeping - Essential", "CAI: Bookkeeping - Premium"],["CAI: Bookkeeping - Essential  (Quarterly)", "CAI: Bookkeeping - Premium (Quarterly)"]];
  const brand = [["CAI: Social Media & Email Marketing - Brand Builder", "CAI: Social Media & Email Marketing - Brand Accelerator"], ["CAI: Social Media & Email Marketing - Brand Builder (Quarterly)", "CAI: Social Media & Email Marketing - Brand Accelerator (Quarterly)"]];
  const bk_setup = ["CAI: Bookkeeping - Basic Setup", "CAI: Bookkeeping - Standard Setup", "CAI: Bookkeeping - Advanced Setup"];

// Group monthly and quarterly products for labeling
  mnth_prods = mnth_prods.concat(bookkeeping[0], brand[0]);
  qrt_prods = qrt_prods.concat(bookkeeping[1], brand[1]);
