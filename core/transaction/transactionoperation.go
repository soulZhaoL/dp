package transaction

import "../definition"

type TransactionOperationInterface interface {
	PrepareToBuy() (txId int, err error)
	GetDataDescriptionList() (despList *[]definition.DescriptionData, err error)
	GetProofDataList() (proofList *[]definition.ProofData, err error)
	BuyData(txId int) (err error)
	SubmitMetaDataIdEncWithBuyer(txId int, encyptedMetaDataId []byte) (err error)
	ConfirmDataTruth(truth bool) (err error)
}