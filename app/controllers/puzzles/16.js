import PuzzlesBaseController from './base';

class Packet {
  constructor(type, value) {
    this.type = type;
    this.value = value;
    this.subPackets = [];
  }

  setValue(number) {
    this.value = number;
  }

  addSubPacket(subpacket) {
    this.subPackets.push(subpacket);
  }
}

export default class Puzzles16Controller extends PuzzlesBaseController {
  hexConvert = {
    0: '0000',
    1: '0001',
    2: '0010',
    3: '0011',
    4: '0100',
    5: '0101',
    6: '0110',
    7: '0111',
    8: '1000',
    9: '1001',
    A: '1010',
    B: '1011',
    C: '1100',
    D: '1101',
    E: '1110',
    F: '1111',
  };

  convertToBinary(array) {
    let bitString = '';
    array.forEach((v) => (bitString += this.hexConvert[v]));
    return bitString;
  }

  // BEGIN-SNIPPET day16-solution1
  solve1(input) {
    let result = [];
    input.forEach((line) =>
      result.push(
        this.parsePacket(0, this.convertToBinary(line).split(''), 0)[0]
      )
    );
    return result;
  }

  parsePacket(versionSum, string, pointer) {
    if (string.length < 11) {
      return [versionSum, undefined, 0];
    }
    let version = parseInt(string.slice(pointer, pointer + 3).join(''), 2);
    let type = parseInt(string.slice(pointer + 3, pointer + 6).join(''), 2);
    pointer = pointer + 6;
    versionSum += version;
    if (type == 4) {
      while (string[pointer] == '1') {
        pointer += 5;
      }
      pointer += 5;
      return [versionSum, string, pointer];
    } else {
      let lengthTypeID = string.slice(pointer, pointer + 1).join('');
      pointer += 1;
      if (lengthTypeID == '0') {
        let totalLength = parseInt(
          string.slice(pointer, pointer + 15).join(''),
          2
        );
        pointer += 15;
        let max = pointer + totalLength;
        while (pointer !== max) {
          let [newVS, , np] = this.parsePacket(versionSum, string, pointer);
          versionSum = newVS;
          pointer = np;
          if (pointer + 11 > max) {
            pointer = max;
          }
        }
        pointer = max;
      } else {
        let subpackAmount = parseInt(
          string.slice(pointer, pointer + 11).join(''),
          2
        );
        pointer = pointer + 11;
        let foundPackets = 0;
        while (foundPackets < subpackAmount) {
          let [newVS, , np] = this.parsePacket(versionSum, string, pointer);
          versionSum = newVS;
          pointer = np;
          foundPackets++;
        }
      }
    }
    return [versionSum, string, pointer];
  }
  // END-SNIPPET

  // BEGIN-SNIPPET day16-solution2
  solve2(input) {
    let packets = [];
    input.forEach((line) =>
      packets.push(
        this.parsePacket2(this.convertToBinary(line).split(''), 0)[0]
      )
    );
    return packets.map((packet) => this.operation(packet));
  }

  parsePacket2(string, pointer) {
    if (string.length < 11) {
      return [undefined, undefined, 0];
    }
    let type = parseInt(string.slice(pointer + 3, pointer + 6).join(''), 2);
    let packet = new Packet(type, undefined);
    pointer = pointer + 6;
    if (type == 4) {
      let number = '';
      while (string[pointer] == '1') {
        number += string.slice(pointer + 1, pointer + 5).join('');
        pointer += 5;
      }
      number += string.slice(pointer + 1, pointer + 5).join('');
      packet.setValue(parseInt(number, 2));
      pointer += 5;
      return [packet, string, pointer];
    } else {
      let lengthTypeID = string.slice(pointer, pointer + 1).join('');
      pointer += 1;
      if (lengthTypeID == '0') {
        let totalLength = parseInt(
          string.slice(pointer, pointer + 15).join(''),
          2
        );
        pointer += 15;
        let max = pointer + totalLength;
        while (pointer !== max) {
          let [subpacket, , np] = this.parsePacket2(string, pointer);
          pointer = np;
          packet.addSubPacket(subpacket);
          if (pointer + 11 > max) {
            pointer = max;
          }
        }
        pointer = max;
      } else {
        let subpackAmount = parseInt(
          string.slice(pointer, pointer + 11).join(''),
          2
        );
        pointer = pointer + 11;
        let foundPackets = 0;
        while (foundPackets < subpackAmount) {
          let [subpacket, , np] = this.parsePacket2(string, pointer);
          packet.addSubPacket(subpacket);
          pointer = np;
          foundPackets++;
        }
      }
    }
    return [packet, string, pointer];
  }

  operation(packet) {
    switch (packet.type) {
      case 0:
        return packet.subPackets
          .map((sp) => this.operation(sp))
          .reduce((prev, sp) => prev + sp, 0);
      case 1:
        return packet.subPackets
          .map((sp) => this.operation(sp))
          .reduce((prev, sp) => prev * sp, 1);
      case 2:
        return packet.subPackets
          .map((sp) => this.operation(sp))
          .sort((a, b) => a - b)[0];
      case 3:
        return packet.subPackets
          .map((sp) => this.operation(sp))
          .sort((a, b) => b - a)[0];
      case 4:
        return packet.value;
      case 5:
        return this.operation(packet.subPackets[0]) >
          this.operation(packet.subPackets[1])
          ? 1
          : 0;
      case 6:
        return this.operation(packet.subPackets[0]) <
          this.operation(packet.subPackets[1])
          ? 1
          : 0;
      case 7:
        return this.operation(packet.subPackets[0]) ==
          this.operation(packet.subPackets[1])
          ? 1
          : 0;
    }
  }
  // END-SNIPPET
}
