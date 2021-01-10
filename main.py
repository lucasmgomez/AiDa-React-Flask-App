# Copyright 2019 Google LLC All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, request, jsonify
from flask_cors import CORS
import gpt_2_simple as gpt2
from datetime import datetime

app = Flask(__name__)
CORS(app)

sess = gpt2.start_tf_sess()
curr_version = "355M"
gpt2.load_gpt2(sess, checkpoint_dir="/opt/app/checkpoint", run_name=curr_version)


@app.route('/sample', methods=['GET'])
def sample():
    version = request.args.get('version')
    length = int(request.args.get('length'))
    prompt = request.args.get('prompt')
    nsamples = int(request.args.get('nsamples'))


    global curr_version
    global sess
    if version != curr_version and version != '':
      sess = gpt2.reset_session(sess)
      gpt2.load_gpt2(sess, checkpoint_dir="/opt/app/checkpoint", run_name=version)
      curr_version = version

    out = gpt2.generate(sess, nsamples=nsamples, prefix=prompt, top_k=0, return_as_list=True,checkpoint_dir="/opt/app/checkpoint", run_name=curr_version, length=length)

    result = ""
    for i in range(nsamples):
      result += "======== SAMPLE " + str(i+1) + " ========\n"
      result += out[i] + "\n"

    return jsonify({"sample" : result})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
