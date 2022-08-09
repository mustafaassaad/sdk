import { ContractTransaction, Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { AzraelAddress } from '../consts';
import IAzrael from './interfaces/iazrael';
import AzraelAbi from '../abi/azrael.abi';
import { prepareBatch, packPrice } from '../utils';
import { PaymentToken } from '../types';

export class Azrael implements IAzrael {
  readonly signer: Signer;
  protected contract: Contract;

  constructor(_signer: Signer, _address?: string) {
    this.signer = _signer;
    this.contract = new Contract(
      _address ?? AzraelAddress,
      AzraelAbi.abi,
      this.signer
    );
  }

  async lend(
    nftAddress: string[],
    tokenID: string[],
    amount: number[],
    maxRentDuration: number[],
    dailyRentPrice: number[],
    nftPrice: number[],
    paymentToken: PaymentToken[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      amount: amount.map(Number),
      maxRentDuration: maxRentDuration.map(Number),
      dailyRentPrice: dailyRentPrice.map(x => packPrice(Number(x).toString())),
      nftPrice: nftPrice.map(x => packPrice(Number(x).toString())),
      paymentToken,
    });

    return await this.contract.lend(
      args.nftAddress,
      args.tokenID,
      args.amount,
      args.maxRentDuration,
      args.dailyRentPrice,
      args.nftPrice,
      args.paymentToken,
      options ?? []
    );
  }

  async rent(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    rentDuration: number[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
      rentDuration: rentDuration.map(Number),
    });

    return await this.contract.rent(
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      args.rentDuration,
      options ?? []
    );
  }

  async returnIt(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
    });

    return await this.contract.returnIt(
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      options ?? []
    );
  }

  async claimCollateral(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
    });

    return await this.contract.claimCollateral(
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      options ?? []
    );
  }

  async stopLending(
    nftAddress: string[],
    tokenID: string[],
    lendingID: string[],
    options?: any
  ): Promise<ContractTransaction> {
    const args = prepareBatch({
      nftAddress: nftAddress.map(String),
      tokenID: tokenID.map(String),
      lendingID: lendingID.map(String),
    });

    return await this.contract.stopLending(
      args.nftAddress,
      args.tokenID,
      args.lendingID,
      options ?? []
    );
  }
}
