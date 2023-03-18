import { SubstrateEvent } from "@subql/types";
import { PolkadotEvents } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const from = event.event.data[0];
  const to = event.event.data[1];
  const amount = event.event.data[2];
  const blockNumber = event.block.block.header.number.toBigInt();

  // no data if we add this filter
  if (blockNumber >= BigInt(10159783)) {
    const record = new PolkadotEvents(event.block.block.header.hash.toString());
    record.blockNumber = blockNumber;
    record.fromAccount = from.toString();
    record.toAccount = to.toString();
    //Big integer type Balance of a transfer event
    record.balanceChange = (amount as Balance).toBigInt();
    record.timestamp = event.block.timestamp;
    await record.save();
  }
}
