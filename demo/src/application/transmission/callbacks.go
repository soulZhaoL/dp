package transmission

import (
	"encoding/json"
	"github.com/asticode/go-astilectron-bootstrap"
	"github.com/btcsuite/btcutil/base58"
	"github.com/ethereum/go-ethereum/common"
	"github.com/pkg/errors"
	"github.com/scryinfo/iscap/demo/src/application/definition"
	"github.com/scryinfo/iscap/demo/src/sdk/core/ethereum/events"
	"github.com/scryinfo/iscap/demo/src/sdk/util/storage/ipfsaccess"
	rlog "github.com/sirupsen/logrus"
	"io/ioutil"
	"math/big"
	"os"
)

const IPFSOutDir = "D:/desktop"
const EventSendFailed = " event send failed. "

var err error

func onPublish(event events.Event) bool {
	go func() {
		var (
			op *definition.OnPublish
		)
		if op, err = getPubDataDetails(event.Data.Get("despDataId").(string)); err != nil {
			rlog.Error(errors.Wrap(err, "onPublish: get publish data details failed. "))
		}
		op.Block = event.BlockNumber
		op.Price = event.Data.Get("price").(*big.Int).String()
		op.PublishID = event.Data.Get("publishId").(string)

		// op.SupportVerify is not implement.
		if err = bootstrap.SendMessage(window, "onPublish", &op); err != nil {
			rlog.Error(errors.Wrap(err, "onPublish"+EventSendFailed))
		}
	}()
	return true
}

// Get publish data details from details' ipfsID.
// ipfsGet -> modify file name -> read file -> json.unmarshal -> delete file
func getPubDataDetails(ipfsID string) (*definition.OnPublish, error) {
	defer func() {
		if er := recover(); er != nil {
			rlog.Error(errors.Wrap(er.(error), "onPublish.callback: get publish data details failed. "))
		}
	}()
	if err = ipfsaccess.GetIAInstance().GetFromIPFS(ipfsID); err != nil {
		return nil, errors.Wrap(err, "Node - onPublish.callback: ipfs get failed. ")
	}

	oldFileName := IPFSOutDir + "/" + ipfsID
	newFileName := oldFileName + ".txt"
	if err = os.Rename(oldFileName, newFileName); err != nil {
		return nil, errors.Wrap(err, "Node - onPublish.callback: rename details file failed. ")
	}

	var details []byte
	if details, err = ioutil.ReadFile(newFileName); err != nil {
		return nil, errors.Wrap(err, "Node - onPublish.callback: read details file failed. ")
	}
	var detailsData definition.OnPublish
	if err = json.Unmarshal(details, &detailsData); err != nil {
		return nil, errors.Wrap(err, "Node - onPublish.callback: json unmarshal details failed. ")
	}

	if err = os.Remove(newFileName); err != nil {
		rlog.Debug("Node - onPublish.callback: delete details file failed. ", err)
	}

	return &detailsData, nil
}

func onApprove(event events.Event) bool {
	go func() {
		var oa definition.OnApprove
		oa.Block = event.BlockNumber

		if err = bootstrap.SendMessage(window, "onApprove", oa); err != nil {
			rlog.Error(errors.Wrap(err, "onApprove"+EventSendFailed))
		}
	}()
	return true
}

func onTransactionCreate(event events.Event) bool {
	go func() {
		var (
			otc definition.OnTransactionCreate
		)
		otc.Block = event.BlockNumber
		if otc.ProofFileNames, err = getAndRenameProofFiles(event.Data.Get("proofIds").([][32]uint8)); err != nil {
			rlog.Error(errors.Wrap(err, "Node - onTC.callback: get and rename proof files failed. "))
		}
		otc.PublishID = event.Data.Get("publishId").(string)
		otc.TransactionID = event.Data.Get("transactionId").(*big.Int).String()
		otc.Buyer = event.Data.Get("users").([]common.Address)[0].String()
		otc.TxState = setTxState(event.Data.Get("state").(uint8))

		if err = bootstrap.SendMessage(window, "onTransactionCreate", otc); err != nil {
			rlog.Error("failed to send onTransactionCreate event, error:", err)
		}
	}()
	return true
}

// Get proof files from proofIDs.
// ipfsGet -> modify file name, how can I get extension?
func getAndRenameProofFiles(ipfsIDs [][32]byte) ([]string, error) {
	var (
		proofs = make([]string, len(ipfsIDs))
	)
	for i := 0; i < len(ipfsIDs); i++ {
		var ipfsID string = ipfsBytes32ToHash(ipfsIDs[i])
		if err = ipfsaccess.GetIAInstance().GetFromIPFS(ipfsID); err != nil {
			return nil, errors.Wrap(err, "Node - onTransactionCreate.callback: ipfs get failed. ")
		}
		proofs[i] = ipfsID
		// add extension here.
	}

	return proofs, nil
}
func ipfsBytes32ToHash(ipfsb [32]byte) string {
	var byte34 []byte = make([]byte, 34)
	// if ipfs modify encrypt algorithm, byte will change together.
	copy(byte34[:2], []byte{byte(18), byte(32)})
	copy(byte34[2:], ipfsb[:])

	return base58.Encode(byte34)
}

func onPurchase(event events.Event) bool {
	go func() {
		var op definition.OnPurchase
		op.Block = event.BlockNumber
		op.TransactionID = event.Data.Get("transactionId").(*big.Int).String()
		op.MetaDataIdEncWithSeller = event.Data.Get("metaDataIdEncSeller").([]byte)
		op.TxState = setTxState(event.Data.Get("state").(uint8))

		if err = bootstrap.SendMessage(window, "onPurchase", op); err != nil {
			rlog.Error(errors.Wrap(err, "onPurchase"+EventSendFailed))
		}
	}()
	return true
}

func onReadyForDownload(event events.Event) bool {
	go func() {
		var orfd definition.OnReadyForDownload
		orfd.Block = event.BlockNumber
		orfd.TransactionID = event.Data.Get("transactionId").(*big.Int).String()
		orfd.MetaDataIdEncWithBuyer = event.Data.Get("metaDataIdEncBuyer").([]byte)
		orfd.TxState = setTxState(event.Data.Get("state").(uint8))

		if err = bootstrap.SendMessage(window, "onReadyForDownload", orfd); err != nil {
			rlog.Error(errors.Wrap(err, "onReadyForDownload"+EventSendFailed))
		}
	}()
	return true
}

func onClose(event events.Event) bool {
	go func() {
		var oc definition.OnClose
		oc.Block = event.BlockNumber
		oc.TransactionID = event.Data.Get("transactionId").(*big.Int).String()
		oc.TxState = setTxState(event.Data.Get("state").(uint8))

		if err = bootstrap.SendMessage(window, "onClose", oc); err != nil {
			rlog.Error("failed to send onClose event, error:", err)
		}
	}()

	return true
}

func setTxState(state byte) string {
	var str string
	switch state {
	case 1:
		str = "Created"
	case 2:
		str = "Voted"
	case 3:
		str = "Buying"
	case 4:
		str = "ReadyForDownload"
	case 5:
		str = "Arbitrating"
	case 6:
		str = "Payed"
	case 7:
		str = "Closed"
	}
	return str
}
