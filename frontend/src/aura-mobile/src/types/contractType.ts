export enum ContractType {
  Subscription = 0,
  Contract = 1,
  Membership = 2,
}

export const CONTRACT_TYPE_LABELS: Record<ContractType, string> = {
  [ContractType.Subscription]: 'Abo',
  [ContractType.Contract]: 'Vertrag',
  [ContractType.Membership]: 'Mitgliedschaft',
};

export const CONTRACT_TYPE_ICONS: Record<ContractType, string> = {
  [ContractType.Subscription]: '📺',
  [ContractType.Contract]: '📄',
  [ContractType.Membership]: '🎯',
};
