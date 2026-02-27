//  A basic React hook that triggers a rerender of the UI.

import { useState } from "react";

function triggerRerender() {
    const [value, setValue] = useState(false);

    setValue(!value);

    return value;
}

export default triggerRerender;