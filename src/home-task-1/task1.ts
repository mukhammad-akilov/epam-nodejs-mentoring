process.stdin.on("data", data => {
    const receivedData = data.toString();
    const revercedData = [...receivedData].reverse().join("");
    process.stdout.write(revercedData + "\n")
})