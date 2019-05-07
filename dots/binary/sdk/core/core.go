package core

import (
	"context"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/pkg/errors"
	chainevents2 "github.com/scryInfo/dp/dots/binary/sdk/core/chainevents"
	accounts2 "github.com/scryInfo/dp/dots/binary/sdk/util/accounts"
	ipfsaccess2 "github.com/scryInfo/dp/dots/binary/sdk/util/storage/ipfsaccess"
	rlog "github.com/sirupsen/logrus"
)

type Connector struct {
	ctx  context.Context
	conn *ethclient.Client
}

//start
func StartEngine(ethNodeAddr string,
	asServiceAddr string,
	contracts []chainevents2.ContractInfo,
	ipfsNodeAddr string) (*ethclient.Client, error) {

	defer func() {
		if err := recover(); err != nil {
			rlog.Error("failed to initialize start engine, error:", err)
		}
	}()

	err := ipfsaccess2.GetIAInstance().Initialize(ipfsNodeAddr)
	if err != nil {
		rlog.Error("failed to initialize ipfs. error: ", err)
		return nil, err
	}

	connector, err := newConnector(ethNodeAddr)
	if err != nil {
		rlog.Error("failed to initialize connector. error: ", err)
		return nil, err
	}

	err = accounts2.GetAMInstance().Initialize(asServiceAddr)
	if err != nil {
		rlog.Error("failed to initialize account service, error:", err)
		return nil, err
	}

	chainevents2.StartEventProcessing(connector.conn, contracts)

	return connector.conn, nil
}

func StartScan(fromBlock uint64) {
	chainevents2.SetFromBlock(fromBlock)
}

func newConnector(ethNodeAddr string) (*Connector, error) {
	cn, err := ethclient.Dial(ethNodeAddr)
	if err != nil {
		return nil, errors.Wrap(err, "Connect to node: "+ethNodeAddr+" failed. ")
	}

	return &Connector{
		ctx:  context.Background(),
		conn: cn,
	}, nil
}
