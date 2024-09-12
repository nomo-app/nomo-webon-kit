import { nomo } from "nomo-webon-kit";
import { useEffect, useState } from "react";

export function useWebOnVersion() {
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    nomo.getManifest().then((res) => {
      setVersion(res.webon_version);
    });
  }, []);
  return version;
}

export function useNomoVersion() {
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    nomo.getPlatformInfo().then((res) => {
      setVersion(
        res.version + "-" + res.buildNumber + "-" + res.operatingSystem
      );
    });
  }, []);
  return version;
}
